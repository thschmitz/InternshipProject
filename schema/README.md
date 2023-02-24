# Schema
## Lucidchart Design

  ![alt text](Screenshot%202023-02-23%20at%2017-38-54%20Diagrama%20em%20branco%20Lucidchart.png)
  
  <br/>

# Tabela `Users`
## Campos
    Todos os campos são obrigatórios

• **id**: Gerado pelo próprio banco de dados. Optei por armazenar os id's em String

• **created_at**: Aqui será armazenado a data de inserção. Formato: ANO-MÊS-DIA HORÁRIO

• **email**: Armazena o email do usuário

• **name**: Armazena o nome do usuário, ele não é um identificador único

• **password**: Armazena a senha do usuário, nesse caso, será criptografado com BCrypt para fornecer maior segurança ao usuário

• **image**: O usuário poderá escolher uma foto de perfil e assim personalizá-lo

• **admin**: Esse campo foi feito para fazer verificação caso o usuário seja admin. O campo armazena o tipo Boolean

# Tabela `Posts`
## Campos
    Todos os campos são obrigatórios

• **id**: Gerado pelo próprio banco de dados. Optei por armazenar os id's em String

• **body**: Neste campo será armazenado a descrição da propriedade

• **created_at**: Aqui será armazenado a data de inserção. Formato: ANO-MÊS-DIA HORÁRIO

• **price**: Armazena o valor que o usuário quer pelo imóvel, seja para alugar ou para comprar, assim dependendo do campo type, que armazena essa informação

• **size**: O usuário poderá informar o tamanho do imóvel que ele está registrando e será armazenado aqui. A medida é m².

• **title**: Armazena o título do post do imóvel que o usuário decide

• **restrooms**: Armazena a quantidade de banheiros que tem o imóvel, fato que servirá de base para a escolha do cliente.

• **bedrooms**: Armazena a quantidade de quartos que tem o imóvel, fato que servirá de base para a escolha do cliente.

• **type**: Esse campo armazena a informação caso o imóvel for aluguel ou venda e assim influenciar no preço final de anúncio.

# Tabela `Feedbacks`
## Campos
    Todos os campos são obrigatórios

• **id**: Gerado pelo próprio banco de dados. Optei por armazenar os id's em String

• **created_at**: Aqui será armazenado a data de inserção. Formato: ANO-MÊS-DIA HORÁRIO

• **post_id**: Aqui terá um id que servirá de referência ao post pelo qual o registro Feedback está associado

• **author_id**: Aqui será feito uma conexão entre o autor do Feedback com o seu registro na tabela `Users`

# Tabela `Comments`
## Campos
    Todos os campos são obrigatórios

• **id**: Gerado pelo próprio banco de dados. Optei por armazenar os id's em String

• **created_at**: Aqui será armazenado a data de inserção. Formato: ANO-MÊS-DIA HORÁRIO

• **body**: Neste campo será armazenado o texto do comentário

• **post_id**: Aqui terá um id que servirá de referência ao post pelo qual o registro Comment está associado

• **author_id**: Aqui será feito uma conexão entre o autor do Comment com o seu registro na tabela `Users`

# Tabela `ImagesPosts`
## Campos
    Todos os campos são obrigatórios

• **id**: Gerado pelo próprio banco de dados. Optei por armazenar os id's em String

• **created_at**: Aqui será armazenado a data de inserção. Formato: ANO-MÊS-DIA HORÁRIO

• **image_url**: Neste campo será armazenado a imagem que o usuário armazenará

• **post_id**: Aqui terá um id que servirá de referência ao post pelo qual o registro Image está associado