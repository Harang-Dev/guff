import pandas as pd

from src.service.WavePaser import WaveParser


class BMParser(WaveParser):
    COLUMNS = [ 'Time', 'Tran', 'Vert', 'Long' ]

    def txt2list(self, txt_file_path):
        filtered_list = []
        f = open(txt_file_path, 'r')
        state = False

        for i in f.readlines():
            if i == "\n":
                state = True
            
            if state:
                filtered_list.append(i.replace("\n", "").replace("\t", ""))

        return list(filter(lambda x:x, filtered_list[1:]))
    
    def list2dict(self, filtered_list):
        data = []
        for num, i in enumerate(filtered_list[1:]):
            time = ((2250/2304) * ((num+1)/1000)) - 0.25    
            tmp = list(filter(lambda x:x, [i.strip() for i in i.split(' ') if i != ',']))
            
            tmp.insert(0, time)
            
            dictData = {c:i for c, i in zip(self.COLUMNS, tmp)}
            data.append(dictData)

        return data
    
    def transDict(self, data):
        df = pd.DataFrame(data)

        tm = pd.Series([abs(float(i['Tran'])) for i in data], name='TM')
        vm = pd.Series([abs(float(i['Vert'])) for i in data], name='VM')
        lm = pd.Series([abs(float(i['Long'])) for i in data], name='LM')

        df.insert(2, tm.name, tm)
        df.insert(4, vm.name, vm)
        df.insert(6, lm.name, lm)

        ppv = pd.Series([max(i['TM'], i['VM'], i['LM']) for i in df.to_dict(orient="records")], name='PPV')

        df.insert(7, ppv.name, ppv)

        return df.to_dict(orient='records')
    
    