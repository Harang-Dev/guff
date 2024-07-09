import copy
from collections import defaultdict, Counter
from itertools import cycle, chain

class ParseService():
    TARGET_TEXT = [ '일자', '발파시간', '계측위치', '진동속도', '진동레벨', '소음', '관리기준', '계측위치' ]


    def getFilteredDataList(self, xmlData: list, columnRows: list[int]):
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