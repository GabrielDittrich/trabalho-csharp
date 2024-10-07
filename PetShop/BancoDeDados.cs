using Microsoft.EntityFrameworkCore;

class BancoDeDados : DbContext
{
    public BancoDeDados(DbContextOptions<BancoDeDados> options) : base(options)
    {
    }

    // Mapeamento das tabelas
    public DbSet<Animal> Animais { get; set; }
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Pessoa> Pessoas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        // Esta linha é opcional se você estiver configurando o contexto no Program.cs
        // builder.UseMySQL("server=localhost;port=3306;database=mysql;user=root;password=dfds2023");
    }
}
