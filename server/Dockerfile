# Используем базовый образ ASP.NET Core Runtime для выполнения приложения
FROM mcr.microsoft.com/dotnet/aspnet:8.0-nanoserver-1809 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Используем образ SDK для сборки приложения
FROM mcr.microsoft.com/dotnet/sdk:8.0-nanoserver-1809 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Копируем решение и проект
COPY ["server.sln", "."]
COPY ["server/server.csproj", "server/"]

# Восстанавливаем зависимости
RUN dotnet restore "server/server.csproj"

# Копируем исходный код и собираем приложение
COPY . .
WORKDIR "/src/server"
RUN dotnet build "server.csproj" -c ${BUILD_CONFIGURATION} -o /app/build

# Публикуем приложение
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "server.csproj" -c ${BUILD_CONFIGURATION} -o /app/publish /p:UseAppHost=false

# Финальный образ на основе ASP.NET Runtime
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "server.dll"]
