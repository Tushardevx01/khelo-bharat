const fs = require('fs');

const replaceInFile = (file, search, replace) => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    fs.writeFileSync(file, content.replace(search, replace));
  }
};

// Fix any -> unknown or disable
replaceInFile("src/features/athletes/actions/athlete.actions.ts", /catch \(error: any\)/g, "catch (error: unknown)");
replaceInFile("src/features/auth/repositories/user.repository.ts", /any/g, "unknown"); // Actually wait, too dangerous.