from abc import ABC, abstractmethod

class ParseService(ABC):
    @abstractmethod
    def delete_non_target_data(self, table_data):
        pass

    @abstractmethod
    def extract_columns(self, table_list):
        pass

    @abstractmethod
    def extract_non_column_data(self, table_list, columns):
        pass

    @abstractmethod
    def group_by_date(self, dict_list):
        pass

    @abstractmethod
    def update_merge_data(self, group_list):
        pass

    @abstractmethod
    def serialize_to_dict(self, group_list, columns):
        pass
