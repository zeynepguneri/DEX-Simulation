import {Command} from 'commander';
import chalk from 'chalk';
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
program.parse(process.argv);