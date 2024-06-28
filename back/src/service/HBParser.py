import pandas as pd

from src.service.WavePaser import WaveParser


class HBParser(WaveParser):
    COLUMNS = [ 'Time(ms)', 'Vib_X_Axis', 'Vib_Y_Axis', 'Vib_Z_Axis', 'PVS']

    def txt2list(self, txt_file_path):
        f = open(txt_file_path, 'r')
        line = f.readlines()

        filtered_list = []
        state = False
        for i in line:
            if any(keyword in i for keyword in self.COLUMNS):
                state = True
            if state:
                filtered_list.append(i.replace("\n", ""))

        return list(filter(lambda x:x, filtered_list[2:]))
    
    def list2dict(self, filtered_list):
        data = []

        for i in filtered_list:
            tmp = [i.strip() for i in i.split('|') if i != '\n']
            dictData = {c:i for c, i in zip(self.COLUMNS, tmp)}
            data.append(dictData)

        return data
    
    def transDict(self, data):
        df = pd.DataFrame(data)

        tm = pd.Series([abs(float(i['Vib_X_Axis'])) for i in data], name='TM')
        vm = pd.Series([abs(float(i['Vib_Y_Axis'])) for i in data], name='VM')
        lm = pd.Series([abs(float(i['Vib_Z_Axis'])) for i in data], name='LM')

        df.insert(2, tm.name, tm)
        df.insert(4, vm.name, vm)
        df.insert(6, lm.name, lm)

        ppv = pd.Series([max(i['TM'], i['VM'], i['LM']) for i in df.to_dict(orient="records")], name='PPV')

        df.insert(7, ppv.name, ppv)

        return df.to_dict(orient='records')
    
    