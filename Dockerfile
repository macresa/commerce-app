FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR appcommerce

COPY ./*csproj ./
RUN dotnet restore

COPY . .
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/sdk:7.0
WORKDIR /appcommerce
COPY --from-build /appcommerce/out