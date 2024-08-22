import numpy as np
import pandas as pd

import matplotlib.pyplot as plt
from scipy.stats import linregress, t
from src.dto.LinearDTO import *

class LinearService:
    def linregress(self, linearData: list[LinearDataDTO]):
        # row 생략 없이 출력
        pd.set_option('display.max_rows', None)
        # col 생략 없이 출력
        pd.set_option('display.max_columns', None)

        df = pd.DataFrame([dto.model_dump() for dto in linearData]).apply(self.setCol, axis=0)

        df['srsd'] = self.setCol(df['m'] / df['kg'] ** 0.5)
        df['logppv'] = self.setCol(np.log10(df['ppv']).rename('logppv'))
        df['logsrsd'] = self.setCol(np.log10(df['srsd']))

        x = df['logsrsd'].to_numpy()
        y = df['logppv'].to_numpy()

        intercept, slope, std_err = self.getChartParameter(x, y)

        C50 = round(10 ** intercept, 3)
        C84 = round(C50 * 10 ** (self.getFreedom(84, len(df)) * std_err), 2)
        C95 = round(C50 * 10 ** (self.getFreedom(95, len(df)) * std_err), 2)

        srsdMin = float(df['srsd'].min() * 0.01)
        srsdMax = float(df['srsd'].max() * 100)

        x_values = np.logspace(np.log10(srsdMin), np.log10(srsdMax), 100)

        yValueForC50 = C50 * (x_values ** slope)
        yValueForC84 = C84 * (x_values ** slope)
        yValueForC95 = C95 * (x_values ** slope)

        result = {
            'x': df['srsd'].tolist(),
            'y': df['ppv'].tolist(),
            'xValue': x_values.tolist(),
            'c50': yValueForC50.tolist(),
            'c84': yValueForC84.tolist(),
            'c95': yValueForC95.tolist(),
        }

        return result

    def getChartParameter(self, x, y):
        slope, intercept, r_value, p_value, std_err = linregress(x, y)
        
        y_pred = intercept + slope * x
        
        standard_error = np.sqrt(np.sum((y - y_pred) ** 2) / (len(y) - 2))

        return intercept, round(slope, 3), round(standard_error, 3)

    def setCol(self, colData: pd.DataFrame):
        if colData.name == 'ppv' :
            return colData.dropna()
        
        return colData.apply(lambda x: round(x, 3)).dropna()

    def getFreedom(self, percent: int, dataLen: int):
        p_value = (100 - percent) * 2 / 100
        degressOfFreedom = 10000000 if dataLen > 30 else dataLen -2

        tinv_value = t.ppf(1 - p_value / 2, degressOfFreedom)
        return round(tinv_value, 3)