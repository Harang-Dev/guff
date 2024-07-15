import copy

from collections import defaultdict, Counter
from itertools import chain

from src.service.ParseService import ParseService
from src.dto.CustomDefaultDict import CustomDefaultDict

class SimpleParser(ParseService):
    TARGET_TEXT = [ 'cm/s', 'dB(V)', 'dB(A)' ]
    
    def getFilteredDataList(self, xmlData: list):
        columnRows = [1, 2]
        tableId = sorted(set([data['table-id'] for data in xmlData]))
        attachedTableIdData = [[data for data in xmlData if data['table-id'] == id]for id in tableId]

        filteredData = [
            sublist for sublist in attachedTableIdData
            if any( entry['row'] in columnRows and any(keyword in entry['text'] for keyword in self.TARGET_TEXT) for entry in sublist )
        ]

        return filteredData

    def expandData(self, data: dict):
        expandData = []

        for i in range(data['colspan']):
            tempData = copy.deepcopy(data)
            tempData['colspan'] = 1
            tempData['col'] += i

            expandData.append(tempData)

        return expandData

    def createRange(self, dataList: list[dict]):
        rowCounts = Counter(data['row'] for data in dataList)
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
    
        
