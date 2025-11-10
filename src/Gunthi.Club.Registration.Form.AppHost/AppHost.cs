var builder = DistributedApplication.CreateBuilder(args);
builder.AddProject<Projects.Gunthi_Club_Registration_Form>("webapp");
builder.Build().Run();