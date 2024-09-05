import os
import lxml.etree as ET

from hwp5.hwp5proc import main

class HwpService:
    def hwp2xml(self, file_path: str):
        exefile="hwp5proc"

        mXml = f'{file_path[:-4]}.xml'
        mHwp = file_path
        command = f'{exefile} xml "{mHwp}" > "{mXml}"'

        try:
            os.system(command)
        except:
            pass

        return mXml

    def findTag(self, xml, findWord: str):
        tree = ET.parse(xml)
        root = tree.getroot()
        elements = list(root.iter())

        textTag = next((item for item in elements if item.text and item.text.startswith(findWord)), None)
        columnTag = next((item for item in textTag.iterancestors() if item.tag == "ColumnSet"), None)
        charShapesList = list(root.findall('.//CharShape'))

        return columnTag, textTag, charShapesList
    
    def setTableData(self, columnTag, textTag, charShapeList):
        findIndex = [i for i in columnTag.iter()].index(textTag)
        tableControl = [ j for j in [ i for i in columnTag.iter()][findIndex:] if j.tag == "TableControl" ]
        tableRow = [i.findall('.//TableRow') for i in tableControl ]

        xml_list = []
        for rows, id in zip(tableRow, [id.get('table-id') for id in tableControl]):
            for row in [ tag for row in rows for tag in row.findall('.//TableCell') ]:
                charShapeIndex = [True if charShapeList[int(id)].get('underline') == 'line_through' else False for id in [t.get('charshape-id') for t in row.findall('.//Text')]]
                
                if all(charShapeIndex):
                    text = "발파 데이터 아님"
                else:
                    text = "".join(t.text for t in row.findall('.//Text') if t.text)
                
                data = {
                    'table-id': int(id),
                    'row': int(row.get('row')),
                    'rowspan': int(row.get('rowspan')),
                    'col': int(row.get('col')),
                    'colspan': int(row.get('colspan')),
                    'text': text,
                }
                print(data)
                xml_list.append(data)

        return xml_list