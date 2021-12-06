CREATE TABLE tblLogSitioTuristico
(
	IdLog INT IDENTITY(1,1) PRIMARY KEY,
	NombreSitio VARCHAR(200),
	IdTipoSitioTuristico INT,
	Evento VARCHAR(100),
	Fecha DATETIME DEFAULT GETDATE(),
	Usuario VARCHAR(100),
	CONSTRAINT [FK_tblLogSitioTuristico_tblTipoSitioTuristico] FOREIGN KEY ([IdTipoSitioTuristico]) REFERENCES [tblTipoSitioTuristico]([IdTipoSitioTuristico])
)