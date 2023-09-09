using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SQLite;

namespace Infra.Context
{
    public class DataContext : IDisposable
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;

        public DataContext(IConfiguration config)
        {
            _config = config;
            _connectionString = _config.GetConnectionString("Database")!;
        }

        public IDbConnection CreateConnection() =>
            new SQLiteConnection(_connectionString);

#pragma warning disable CA1816 // Dispose methods should call SuppressFinalize
        public void Dispose() => CreateConnection().Dispose();
    }
}
