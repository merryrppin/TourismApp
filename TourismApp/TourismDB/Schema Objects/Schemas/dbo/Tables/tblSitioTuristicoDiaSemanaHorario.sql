CREATE TABLE [dbo].[tblSitioTuristicoDiaSemanaHorario]
(
	[tblSitioTuristicoDiaSemanaHorario] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[IdSitioTuristicoDiaSemana] INT NOT NULL,
	[HoraInicio] INT NULL,
	[HoraFin] INT NULL
)
