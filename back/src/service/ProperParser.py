import copy, ast
from itertools import chain

from src.dto.CustomDefaultDict import CustomDefaultDict
from src.service.ParseService import ParseService

class ProperParser(ParseService):
    TARGET_TEXT = [ 'cm/s', 'dB(V)', 'dB(A)' ]

    def getFilteredDataList(self, xmlData: list):
        columnRows = [0, 1]
        tableId = sorted(set([data['table-id'] for data in xmlData]))
        attachedTableIdData = [[data for data in xmlData if data['table-id'] == id]for id in tableId]

        filteredData = [
            sublist for sublist in attachedTableIdData if any( entry['row'] in columnRows and any(keyword in entry['text'] for keyword in self.TARGET_TEXT) for entry in sublist )
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

    def createRange(self, dataList: list):
        mergeDataList = [mergeData for mergeData in dataList if mergeData['rowspan'] > 1]
        
        mergeRanges = CustomDefaultDict()
        for data in mergeDataList:
            row = data['row']
            mergeRanges.append(f'{data}', list(range(row + 1, row + data['rowspan'])))
        
        return dict(mergeRanges)
    
    def getSerializeList(self, xmlDataList: list):
        dataList = list(chain.from_iterable(self.expandData(xmlData) for xmlData in xmlDataList if xmlData['row'] not in [0, 1]))
        columns = [column for column in xmlDataList if column['row'] in [0, 1] and column['colspan'] < 2]

        mergeDataRanges = self.createRange(dataList)
        for key in mergeDataRanges:
            for row in mergeDataRanges[key]:
                tempData = copy.deepcopy(ast.literal_eval(key))
                tempData['row'] = row
                dataList.append(tempData)

        result = []
        sortedDataList = sorted(dataList, key=lambda x: (x['row'], x['col']))
        for row in list(set([row['row'] for row in sortedDataList])):
            customDict = CustomDefaultDict()
            rowsGroupList = [data for data in sortedDataList if data['row'] == row]
            for datum, column in zip(rowsGroupList, columns):
                customDict.append(column['text'].replace(" ", ""), datum['text'])
            result.append(dict(customDict))

        return result
