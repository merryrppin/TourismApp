CREATE TABLE [dbo].[tblCulturaGeneral]
(
	[IdCulturaGeneral] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[NombreCulturaGeneralESP] VARCHAR(250) NOT NULL,
	[NombreCulturaGeneralENG] VARCHAR(250) NULL,
	[Codigo] VARCHAR(10) NOT NULL,
	[Activo] BIT NOT NULL DEFAULT(0)
)
