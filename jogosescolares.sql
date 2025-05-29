-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS jogosescolares;
USE jogosescolares;

-- Tabela de jogadores
CREATE TABLE IF NOT EXISTS jogadores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    idade INT,
    pontos INT DEFAULT 0,
    partidas INT DEFAULT 0
);

-- Procedure para inserir jogador
DELIMITER $$
CREATE PROCEDURE inserir_jogador_Pedro (
    IN p_nome VARCHAR(100),
    IN p_idade INT,
    IN p_pontos INT
)
BEGIN
    INSERT INTO jogadores (nome, idade, pontos)
    VALUES (p_nome, p_idade, p_pontos);
END$$
DELIMITER ;

-- Procedure para listar jogadores em ordem de pontos (ranking)
DELIMITER $$
CREATE PROCEDURE listar_jogadores_Pedro ()
BEGIN
    SELECT id, nome, idade, pontos, partidas,
        CASE
            WHEN pontos >= 100 THEN 'Categoria: Ouro'
            WHEN pontos >= 50 THEN 'Categoria: Prata'
            ELSE 'Categoria: Bronze'
        END AS categoria
    FROM jogadores
    ORDER BY pontos DESC;
END$$
DELIMITER ;

-- Procedure para deletar jogador pelo ID
DELIMITER $$
CREATE PROCEDURE deletar_jogador_Pedro (IN p_id INT)
BEGIN
    DELETE FROM jogadores WHERE id = p_id;
END$$
DELIMITER ;

-- Procedure para adicionar pontos a um jogador
DELIMITER $$
CREATE PROCEDURE adicionar_pontos_Pedro (
    IN p_id INT,
    IN p_pontos INT
)
BEGIN
    UPDATE jogadores
    SET pontos = pontos + p_pontos
    WHERE id = p_id;
END$$
DELIMITER ;

-- Procedure para remover pontos de um jogador
DELIMITER $$
CREATE PROCEDURE remover_pontos_Pedro (
    IN p_id INT,
    IN p_pontos INT
)
BEGIN
    UPDATE jogadores
    SET pontos = pontos - p_pontos
    WHERE id = p_id;
END$$
DELIMITER ;

-- Procedure para registrar partida (incrementar partidas jogadas)
DELIMITER $$
CREATE PROCEDURE registrar_partida_Pedro (IN p_id INT)
BEGIN
    UPDATE jogadores
    SET partidas = partidas + 1
    WHERE id = p_id;
END$$
DELIMITER ;
