import { Module } from '@nestjs/common';

const HANDSOME_AARON = {
  provide: 'HANDSOME_AARON',
  // useValue: {
  //   name: 'Aaron Tu',
  // },
  useFactory: async () => {
    const getDB = new Promise((resolve) => {
      setTimeout(
        () => resolve({ connectionString: 'afoielkn3nflkasdnf' }),
        2000,
      );
    });
    const db = await getDB;
    return db;
  },
};

@Module({
  providers: [HANDSOME_AARON],
  exports: [HANDSOME_AARON],
})
export class HandsomeModule {}
