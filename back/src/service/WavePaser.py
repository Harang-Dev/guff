from abc import ABC, abstractmethod

class WaveParser(ABC):
    @abstractmethod
    def txt2list(self, txt_file_path):
        pass

    @abstractmethod
    def list2dict(self, filtered_list):
        pass

    @abstractmethod
    def transDict(self, data):
        pass
