CREATE PROCEDURE [dbo].[GuardarComentariosSitioTuristico]
	@JsonComentarios VARCHAR(MAX)
AS BEGIN
	CREATE TABLE #ComentariosSitioTuristico([IdSitioTuristico] INT, [Email] VARCHAR(150), [LoginType] VARCHAR(50), [Calificacion] INT, [Comentarios] VARCHAR(MAX), [img1] VARCHAR(MAX), [img2] VARCHAR(MAX))

	INSERT INTO #ComentariosSitioTuristico([IdSitioTuristico], [Email], [LoginType], [Calificacion], [Comentarios], [img1], [img2])
    SELECT IdSitioTuristico, Email, LoginType, Calificacion, Comentarios, img1, img2
    FROM OPENJSON(@JsonComentarios)
        WITH (
          IdSitioTuristico INT 'strict $.IdSitioTuristico',
          Email VARCHAR(150) 'strict $.Email',
          LoginType VARCHAR(50) 'strict $.LoginType',
          Calificacion INT 'strict $.Calificacion',
          Comentarios VARCHAR(MAX) 'strict $.Comentarios',
          img1 VARCHAR(MAX) 'strict $.img1',
          img2 VARCHAR(MAX) 'strict $.img2'
        );

    MERGE [tblComentariosSitioTuristico] AS ComentariosST
    USING (SELECT IdSitioTuristico, Email, LoginType, Calificacion, Comentarios, img1, img2 FROM #ComentariosSitioTuristico) AS InputData
    ON (ComentariosST.Email = InputData.Email AND ComentariosST.LoginType = InputData.LoginType AND ComentariosST.IdSitioTuristico = InputData.IdSitioTuristico)
    WHEN MATCHED THEN
        UPDATE SET ComentariosST.DiaRegistro = GETDATE(), ComentariosST.img1 = InputData.img1, ComentariosST.img2 = InputData.img2, ComentariosST.Comentarios = InputData.Comentarios, ComentariosST.img1Aprovada = 0, ComentariosST.img2Aprovada = 0, 
            ComentariosST.Calificacion = InputData.Calificacion 
    WHEN NOT MATCHED THEN
        INSERT(IdSitioTuristico, Email, LoginType, Calificacion, Comentarios, img1, img2)
        VALUES(InputData.IdSitioTuristico, InputData.Email, InputData.LoginType, InputData.Calificacion, InputData.Comentarios, InputData.img1, InputData.img2);

	DROP TABLE IF EXISTS #ComentariosSitioTuristico;
END
