CREATE PROCEDURE [dbo].[ObtenerCulturaGeneralMunicipio]
	@IdMunicipio INT
AS BEGIN
	SELECT m.IdMunicipio, m.NombreMunicipio, mcg.ValorESP, mcg.ValorENG, mcg.Imagen, mcg.Orden, cg.NombreCulturaGeneralESP, cg.NombreCulturaGeneralENG
	FROM tblMunicipio AS m
	INNER JOIN tblMunicipioCulturaGeneral AS mcg ON m.IdMunicipio = mcg.IdMunicipio
	INNER JOIN tblCulturaGeneral AS cg ON mcg.IdCulturaGeneral = cg.IdCulturaGeneral
	WHERE m.IdMunicipio = @IdMunicipio
	ORDER BY mcg.Orden
END