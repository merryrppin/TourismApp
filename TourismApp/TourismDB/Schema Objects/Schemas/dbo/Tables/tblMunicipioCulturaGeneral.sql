CREATE TABLE [dbo].[tblMunicipioCulturaGeneral]
(
	[IdMunicipioCulturaGeneral] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[IdMunicipio] INT NOT NULL,
	[IdCulturaGeneral] INT NOT NULL,
	[Valor] VARCHAR(MAX) NOT NULL,
	[Orden] INT NOT NULL, 
    CONSTRAINT [FK_tblMunicipioCulturaGeneral_tblMunicipio] FOREIGN KEY ([IdMunicipio]) REFERENCES [tblMunicipio]([IdMunicipio]), 
    CONSTRAINT [FK_tblMunicipioCulturaGeneral_tblCulturaGeneral] FOREIGN KEY ([IdCulturaGeneral]) REFERENCES [tblCulturaGeneral]([IdCulturaGeneral])
)
