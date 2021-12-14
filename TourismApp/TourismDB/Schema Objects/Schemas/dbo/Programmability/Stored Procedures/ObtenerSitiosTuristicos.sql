CREATE PROCEDURE [dbo].[ObtenerSitiosTuristicos] (@IdMunicipio INT = -1,@CodigoTipoSitio VARCHAR(10) = NULL)
AS BEGIN

	DECLARE @SQL nvarchar(MAX)

	SET @SQL = N'
			SELECT
				sitioT.IdSitioTuristico,
				sitioT.NombreSitioTuristicoESP,
				sitioT.NombreSitioTuristicoENG,
				sitioT.IdMunicipio,
				sitioT.Latitud,
				sitioT.Longitud,
				sitioT.Altitud,
				sitioT.IconoMarcador,
				sitioT.Activo,
				sitioT.DescripcionESP,
				sitioT.DescripcionENG,
				sitioT.PresentacionESP,
				sitioT.PresentacionENG,
				sitioT.RutaESP,
				sitioT.RutaENG,
				sitioT.DireccionESP,
				sitioT.DireccionENG,
				sitioT.IdTipoSitioTuristico,
				tipoSitio.Nombre,
				tipoSitio.Codigo,
				sitioT.Imperdible,
				(Select IdCalificacionST,Calificacion,Comentario,Usuario FROM tblCalificacionSitioTuristico AS CST WHERE CST.IdSitioTuristico = sitioT.IdSitioTuristico FOR JSON AUTO ) AS Comentarios,
				(Select AVG(Calificacion) AS PromCalificacion FROM tblCalificacionSitioTuristico AS CST WHERE CST.IdSitioTuristico = sitioT.IdSitioTuristico) AS PromCalificacion
			FROM tblSitioTuristico AS sitioT
				INNER JOIN tblTipoSitioTuristico AS tipoSitio ON sitioT.IdTipoSitioTuristico = tipoSitio.IdTipoSitioTuristico
			WHERE 1 = 1 '

	IF @CodigoTipoSitio IS NOT NULL
	BEGIN
		SET @SQL+=	' AND tipoSitio.Codigo = @CodigoTipoSitio '
	END

	IF @IdMunicipio != -1
	BEGIN
		SET @SQL+=	' AND sitioT.IdMunicipio = @IdMunicipio '
	END

	EXEC sp_executesql @SQL, N'@CodigoTipoSitio VARCHAR(10), @IdMunicipio INT', @CodigoTipoSitio = @CodigoTipoSitio, @IdMunicipio = @IdMunicipio; 

	IF  @CodigoTipoSitio IS NOT NULL
	BEGIN
		SELECT sitioT.IdSitioTuristico, tblHorarios.IdHorario,tblHorarios.Horario,tblDiaSemana.NombreDiaESP,diaHorario.IdDiaSemana
		FROM tblDiaHorarioSitioTuristico diaHorario
			INNER JOIN tblHorarios ON diaHorario.IdHorario = tblHorarios.IdHorario
			INNER JOIN tblDiaSemana ON diaHorario.IdDiaSemana = tblDiaSemana.IdDiaSemana
			INNER JOIN tblSitioTuristico AS sitioT ON tblHorarios.IdSitioTuristico = sitioT.IdSitioTuristico
			INNER JOIN tblTipoSitioTuristico AS tipoSitio ON sitioT.IdTipoSitioTuristico = tipoSitio.IdTipoSitioTuristico
		WHERE tipoSitio.Codigo = @CodigoTipoSitio
	END

END