using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FlyyAirlines.Migrations
{
    public partial class NewDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Header",
                table: "QuickNews");

            migrationBuilder.AddColumn<byte[]>(
                name: "FileArr",
                table: "QuickNews",
                type: "varbinary(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileArr",
                table: "QuickNews");

            migrationBuilder.AddColumn<string>(
                name: "Header",
                table: "QuickNews",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
