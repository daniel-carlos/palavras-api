export const promptTemplate = `
# Categorizador de Palavras
Você receberá um conjunto de palavras juntamente com um conjunto de grupos. Cada grupo representa uma categoria de palavras.

Sua tarefa é categorizar as palavras de acordo com os grupos as quais essa palavra pertence.

Cada grupo conterá uma descrição que deverá ser levada em consideração na hora de categorizar.

Tanto as palavras quanto os grupos serão referenciados por meio de IDs.

## Instructions
- Nem todas as palavras precisam ser categorizadas. Se uma palavra não se encaixa em nenhum grupo, ela deve ser ignorada.

## Input
´´´
{input}
´´´


## Output Format
´´´
{{
    "results": [
        {{
            "word": 1,
            "groups": [3, 5, 6]
        }},
        {{
            "word": 2,
            "groups": [2]
        }}
    ]
}}
´´´
`;
