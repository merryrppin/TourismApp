CREATE PROCEDURE EliminarHorario(@IdSitioTuristico INT,@IdHorario INT,@Usuario VARCHAR(500))
AS BEGIN

	DECLARE @TempLog AS TABLE (NombreSitio VARCHAR(200),IdTipoSitioTuristico INT, Evento VARCHAR(100), Fecha DATETIME DEFAULT GETDATE(),Usuario VARCHAR(100))
	 
	 INSERT INTO @TempLog (NombreSitio ,IdTipoSitioTuristico, Evento, Usuario) 
	 SELECT tblSitioTuristico.NombreSitioTuristicoESP, TipoSitioTuristico.IdTipoSitioTuristico,'Eliminacion horario',@Usuario
	 FROM tblTipoSitioTuristico AS TipoSitioTuristico
	 INNER JOIN tblSitioTuristico ON TipoSitioTuristico.IdTipoSitioTuristico = tblSitioTuristico.IdTipoSitioTuristico
	 WHERE tblSitioTuristico.IdSitioTuristico = @IdSitioTuristico

	BEGIN TRY  
	BEGIN TRANSACTION

		DELETE diaHorario
		FROM tblDiaHorarioSitioTuristico diaHorario
		INNER JOIN tblHorarios ON diaHorario.IdHorario = tblHorarios.IdHorario
		WHERE tblHorarios.IdSitioTuristico =@IdSitioTuristico AND tblHorarios.IdHorario =@IdHorario;

		DELETE
		FROM tblHorarios
		WHERE IdSitioTuristico =@IdSitioTuristico AND tblHorarios.IdHorario =@IdHorario;

		INSERT INTO tblLogSitioTuristico (NombreSitio ,IdTipoSitioTuristico, Evento, Usuario) 
		SELECT NombreSitio ,IdTipoSitioTuristico, Evento, Usuario FROM @TempLog

	COMMIT TRANSACTION
	END TRY  
	BEGIN CATCH  
		SELECT ERROR_MESSAGE();
		ROLLBACK TRANSACTION
	END CATCH


END