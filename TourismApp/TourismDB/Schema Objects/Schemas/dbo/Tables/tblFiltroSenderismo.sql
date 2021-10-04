CREATE TABLE [dbo].[tblFiltroSenderismo]
(
	[IdFiltroSenderismo] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[NombreFiltroSenderismo] VARCHAR(250) NOT NULL,
	[NombreFiltroSenderismoENG] VARCHAR(250) NOT NULL,
	[Orden] INT NOT NULL,
	[Estado] INT NOT NULL DEFAULT(1)
)
