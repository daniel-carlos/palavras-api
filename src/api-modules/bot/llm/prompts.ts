export const promptTemplate = `
# Categorizador de Palavras
Você receberá um conjunto de palavras juntamente com um conjunto de grupos. Cada grupo representa uma categoria de palavras.

Sua tarefa é categorizar as palavras de acordo com os grupos as quais essa palavra pertence.

Cada grupo conterá uma descrição que deverá ser levada em consideração na hora de categorizar.

Tanto as palavras quanto os grupos serão referenciados por meio de IDs.

## Instructions
- Nem todas as palavras precisam ser categorizadas. Se uma palavra não se encaixa em nenhum grupo, ela deve ser ignorada.
- Sempre leia a descrição de cada grupo antes de categorizar uma palavra e leve em consideração as relações entre as palavras e os grupos.
- Não existe um limite de quantos grupos uma palavra pode estar inserida.

## Input
´´´
{input}
´´´
`;
