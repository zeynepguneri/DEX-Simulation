import {Command} from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import readline from 'readline';
import promptSync from 'prompt-sync';
const prompt = promptSync();

function likidite_func(){
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (!data) return; 
        const jsonData = JSON.parse(data);
        const pool = jsonData.pool;
        const userBalance = jsonData.userBalance;
        const tokenAInput = Number(prompt('Token A miktarını giriniz: '));
        const tokenBInput = Number(prompt('Token B miktarını giriniz: '));
    if (userBalance.tokenA < tokenAInput || userBalance.tokenB < tokenBInput) {
        console.log(chalk.red('Yeterli bakiyeniz yok.'));
        return;
      }
    else {
        userBalance.tokenA -= tokenAInput;
        userBalance.tokenB -= tokenBInput;
        pool.tokenA += tokenAInput;
        pool.tokenB += tokenBInput;
        pool.K = pool.tokenA * pool.tokenB;
        fs.writeFileSync('data.json', JSON.stringify({ pool, userBalance }, null, 2));
        console.log("Likidite başarıyla eklendi.")
        console.log('Havuz durumu:', pool);
        console.log('Yeni bakiyeniz:', userBalance);
    }
    });
    
}

const program = new Command();
program
    .command('menü')
    .description('Kullanıcıya menüyü göster.')
    .action(()=>{
        console.log('\n1. Likidite ekle');
        console.log('2. Swap');
        console.log('3. Havuz durumunu görüntüle');
        console.log('4. Bakiye görüntüle');
        console.log('5. Çıkış');
})
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
rl.question('Yapmak istediğiniz işlemi seçiniz: ', (answer) => {
    const giris = answer;
    switch(giris){
        case '1':
            console.log("Likidite ekleniyor.")
            likidite_func()
            break;
        case '2':
            console.log("Swap yapılıyor.")
            break;
        case '3':
            console.log("Havuz durumu görüntüleniyor.")
            break;
        case '4':
            console.log("Bakiye görüntüleniyor.")
            break;
        case '5':
            console.log("Çıkış yapılıyor.")
            break;

    }
    rl.close(); 
  });

program.parse(process.argv);
