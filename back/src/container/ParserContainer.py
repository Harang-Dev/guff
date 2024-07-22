from dependency_injector import containers, providers
from src.service.SimpleParser import SimpleParser
from src.service.ComplicatedParser import ComplicatedParser
from src.service.ProperParser import ProperParser

class ParserContainer(containers.DeclarativeContainer):
    config = providers.Configuration()

    simpleParser = providers.Factory(SimpleParser)
    properParser = providers.Factory(ProperParser)
    complicatedParser = providers.Factory(ComplicatedParser)

    parserVersion = providers.Dict(
        간단이=simpleParser,
        복잡이=complicatedParser,
        어중이떠중이=properParser,
    )

    