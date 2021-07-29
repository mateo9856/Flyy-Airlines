#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["FlyyAirlines/FlyyAirlines.csproj", "FlyyAirlines/"]
COPY ["FlyyAirlines/libwkhtmltox.dll", "FlyyAirlines/"]
COPY ["FlyyAirlines/libwkhtmltox.dylib", "FlyyAirlines/"]
COPY ["FlyyAirlines/libwkhtmltox.so", "FlyyAirlines/"]
COPY ["FlyyAirlines.Data/FlyyAirlines.Data.csproj", "FlyyAirlines.Data/"]
COPY ["FlyyAirlines.Repository/FlyyAirlines.Repository.csproj", "FlyyAirlines.Repository/"]
COPY ["FlyyAirlines.DTO/FlyyAirlines.DTO.csproj", "FlyyAirlines.DTO/"]
COPY ["FlyyAirlines.Tests/FlyyAirlines.Tests.csproj", "FlyyAirlines.Tests/"]
RUN dotnet restore "FlyyAirlines/FlyyAirlines.csproj"
COPY . .
WORKDIR "/src/FlyyAirlines"
RUN dotnet build "FlyyAirlines.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FlyyAirlines.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FlyyAirlines.dll"]