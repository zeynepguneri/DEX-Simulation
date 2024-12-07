import {Command} from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import readline from 'readline';

const program = new Command();
program
    .command('menu')
    .description('Kullanıcıya menüyü göster.')
    .action(()=>{
        console.log('Yapmak istediğiniz işlemi seçiniz:');
        console.log('1. Likidite ekle');
        console.log('2. Swap');
        console.log('3. Havuz durumunu görüntüle');
        console.log('4. Bakiye görüntüle');
        console.log('5. Çıkış');
})
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
rl.question('Lütfen bir değer girin: ', (answer) => {
    const giris = answer
    rl.close(); 
  });
  

fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('Dosya içeriği:', data);
});

program.parse(process.argv);
