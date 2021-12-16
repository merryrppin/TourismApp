CREATE PROCEDURE dbo.[EliminarSitioTuristico] (@IdSitioTuristico INT,@Usuario VARCHAR(100))
AS 
BEGIN
	 DECLARE @TempLog AS TABLE (NombreSitio VARCHAR(200),IdTipoSitioTuristico INT, Evento VARCHAR(100), Fecha DATETIME DEFAULT GETDATE(),Usuario VARCHAR(100))
	 
	 INSERT INTO @TempLog (NombreSitio ,IdTipoSitioTuristico, Evento, Usuario) 
	 SELECT tblSitioTuristico.NombreSitioTuristicoESP, TipoSitioTuristico.IdTipoSitioTuristico, 'Eliminacion',@Usuario
	 FROM tblTipoSitioTuristico AS TipoSitioTuristico
	 INNER JOIN tblSitioTuristico ON TipoSitioTuristico.IdTipoSitioTuristico = tblSitioTuristico.IdTipoSitioTuristico
	 WHERE tblSitioTuristico.IdSitioTuristico = @IdSitioTuristico

	BEGIN TRY  
	BEGIN TRANSACTION

		DELETE PuntoReferencia
		FROM tblPuntoReferencia PuntoReferencia
		INNER JOIN tblSitioTuristico ON PuntoReferencia.IdSitioTuristico = tblSitioTuristico.IdSitioTuristico
		WHERE tblSitioTuristico.IdSitioTuristico =@IdSitioTuristico;

		DELETE PuntoSenderismo
		FROM tblPuntoSenderismo PuntoSenderismo
		INNER JOIN tblSitioTuristico ON PuntoSenderismo.IdSitioTuristico = tblSitioTuristico.IdSitioTuristico
		WHERE tblSitioTuristico.IdSitioTuristico =@IdSitioTuristico;

		DELETE 
		FROM tblComentariosSitioTuristico
		WHERE IdSitioTuristico =@IdSitioTuristico;

		DELETE
		FROM tblGaleriaFotos 
		WHERE IdSitioTuristico =@IdSitioTuristico;

		DELETE 
		FROM tblSitioTuristico
		WHERE IdSitioTuristico = @IdSitioTuristico;

		INSERT INTO tblLogSitioTuristico (NombreSitio ,IdTipoSitioTuristico, Evento, Usuario) 
		SELECT NombreSitio ,IdTipoSitioTuristico, Evento, Usuario FROM @TempLog

	COMMIT TRANSACTION
	END TRY  
	BEGIN CATCH  
		SELECT ERROR_MESSAGE();
		ROLLBACK TRANSACTION
	END CATCH

END