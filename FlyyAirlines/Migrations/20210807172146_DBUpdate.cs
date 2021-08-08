using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FlyyAirlines.Migrations
{
    public partial class DBUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileArr",
                table: "QuickNews");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "FileArr",
                table: "QuickNews",
                type: "varbinary(max)",
                nullable: true);
        }
    }
}
