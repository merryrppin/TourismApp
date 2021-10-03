CREATE TABLE [dbo].[tblValorFiltroSenderismo]
(
	[IdValorFiltro] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Valor] VARCHAR(MAX) NOT NULL,
	[ValorENG] VARCHAR(MAX),
	[IdFiltroSenderismo] INT NOT NULL,
	[IdRutaAlternativa] INT NOT NULL, 
    CONSTRAINT [FK_tblValorFiltroSenderismo_tblFiltroSenderismo] FOREIGN KEY ([IdFiltroSenderismo]) REFERENCES [tblFiltroSenderismo]([IdFiltroSenderismo]),
    CONSTRAINT [FK_tblValorFiltroSenderismo_tblRutaAlternativa] FOREIGN KEY ([IdRutaAlternativa]) REFERENCES [tblRutaAlternativa]([IdRutaAlternativa]),
)
