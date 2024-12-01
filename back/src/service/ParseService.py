from abc import ABCMeta, abstractmethod

class ParseService(metaclass=ABCMeta):
    @abstractmethod
    def getFilteredDataList(self, xmlData):
        pass

    @abstractmethod
    def expandData(self, data):
        pass

    @abstractmethod
    def createRange(self, dataList):
        pass

    @abstractmethod
    def getSerializeList(self, xmlDataList):
        pass