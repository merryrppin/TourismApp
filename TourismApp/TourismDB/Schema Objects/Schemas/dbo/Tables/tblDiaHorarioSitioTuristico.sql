CREATE TABLE tblDiaHorarioSitioTuristico
(
IdDiaHorarioSitioSemana INT IDENTITY(1,1) PRIMARY KEY,
IdHorario INT,
IdDiaSemana INT,
CONSTRAINT [FK_tblDiaHorarioSitioTuristico_tblDiaSemana] FOREIGN KEY ([IdDiaSemana]) REFERENCES [tblDiaSemana]([IdDiaSemana]),
CONSTRAINT [FK_tblDiaHorarioSitioTuristico_tblHorarios] FOREIGN KEY ([IdHorario]) REFERENCES [tblHorarios]([IdHorario])
)