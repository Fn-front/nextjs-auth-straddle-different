import { PrismaClient } from '@prisma/client'

// インスタンスを生成
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding data...');

  await prisma.todo.deleteMany();

  const count = 10
  const setData: any = []

  for (let i = 0; i < count; i++) {
    const data = {
      id: i+1,
      title: 'ダミーテキスト'+(i+1),
      date: new Date(),
      done: false
    }
    setData.push(data)
  }

  const addData = async () => await prisma.todo.createMany({ data: setData });

  addData()

  console.log('Data seeding complete.');
}

main()
  .catch(err => {
    console.error('Error seeding data:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });