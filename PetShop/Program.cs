using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policyBuilder =>
        {
            policyBuilder.WithOrigins("http://localhost:3000") // substitua pelo URL do seu front-end
                          .AllowAnyHeader()
                          .AllowAnyMethod();
        });
});

// Configuração Swagger no builder
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuração banco MySQL
builder.Services.AddDbContext<BancoDeDados>(options =>
    options.UseMySQL("server=localhost;port=3306;database=mysql;user=root;password=1234"));

var app = builder.Build();

// Uso do CORS
app.UseCors("AllowSpecificOrigin");

// Configuração Swagger no app
app.UseSwagger();
app.UseSwaggerUI();

// URL do Swagger: http://localhost:xxxx/swagger/index.html

app.MapGet("/", () => "PetShop");

// Mapear APIs
app.MapPessoasApi();
app.MapPetShopApi();
app.MapProdutosApi();

app.Run();
