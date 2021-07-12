CREATE TABLE [dbo].[tblDiaSemana]
(
	[IdDiaSemana] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[NombreDiaESP] VARCHAR(15) NOT NULL,
	[NombreDiaENG] VARCHAR(15) NULL,
	[NumeroDiaSemana] INT NOT NULL
)
