CREATE TABLE [dbo].[tblSitioTuristicoDiaSemana]
(
	[IdSitioTuristicoDiaSemana] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[IdSitioTuristico] INT NOT NULL,
	[IdDiaSemana] INT NOT NULL, 
    CONSTRAINT [FK_tblSitioTuristicoDiaSemana_tblSitioTuristico] FOREIGN KEY ([IdSitioTuristico]) REFERENCES [tblSitioTuristico]([IdSitioTuristico]),
    CONSTRAINT [FK_tblSitioTuristicoDiaSemana_tblDiaSemana] FOREIGN KEY ([IdDiaSemana]) REFERENCES [tblDiaSemana]([IdDiaSemana]),
)
