from collections import defaultdict, Counter
from itertools import chain

from src.service.ParseService import ParseService
from src.dto.CustomDefaultDict import CustomDefaultDict

class SimpleParser(ParseService):
    TARGET_TEXT = [ '구분', '진동속도', '진동레벨', '소음', '허용기준', '비고' ]
    
    def createRange(self, dateDataList: list[dict]):
        rowCounts = Counter(data['row'] for data in dateDataList)
        dateRow = sorted(list({row: count for row, count in rowCounts.items() if count == 1}.keys()))
        
        ranges = defaultdict(range)
        if len(dateRow) < 2:
            ranges[0] = range(dateRow[0] + 1, max(rowCounts.keys()) + 1)
        else:
            for index in range(len(dateRow)):
                startIndex = dateRow[index - 1] + 1
                endIndex = dateRow[index] - 1
                if startIndex <= endIndex:
                    ranges[dateRow[index - 1]] = range(startIndex, endIndex + 1)
            
            ranges[dateRow[-1]] = range(endIndex + 2, max(rowCounts.keys()) + 1)

        return dateRow, dict(ranges)

    def getSerializeList(self, xmlDataList: list):
        dateRowList, dateRowRanges = self.createRange(xmlDataList)
        
        dataList = list(chain.from_iterable(self.expandData(xmlData) for xmlData in xmlDataList if xmlData['row'] not in dateRowList + [1, 2]))
        columns = list(chain.from_iterable(self.expandData(column) for column in xmlDataList if column['row'] in [1]))

        result = []
        for dateRow in dateRowList:
            for row in dateRowRanges[dateRow]:
                if row not in [dateRow + 1, dateRow + 2]:
                    customDict = CustomDefaultDict()
                    customDict.append('일시', next(date['text'] for date in xmlDataList if date['row'] in [dateRow]))
                    rowsGroupList = [data for data in dataList if data['row'] in [row]]
                    for data, column in zip(rowsGroupList, columns):
                        customDict.append(column['text'], data['text'])
                    result.append(dict(customDict))

        return result
    
        
