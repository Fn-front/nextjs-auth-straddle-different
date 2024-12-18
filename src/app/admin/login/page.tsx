'use client'

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

/* eslint-disable */
export default function AdminLogin() {

  const router = useRouter();
  // パラメータ情報取得
  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [email, setEmail] = useState<string>('')
  const [pass, setPass] = useState<string>('')

  const handleFormSubmit = async () => {

    console.log(signIn);

    await signIn('credentials', {
      redirect: false,
      email: email,
      password: pass,
    })
      .then((res: any) => {

        if (res?.error) {
          console.log(res.error);
        }

        router.push('/admin');
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <>
      <h2 className='c_h2'>adminログインページ</h2>
      <TextField
        id="user"
        label="email"
        variant="outlined"
        sx={{ input: { color: '#fff', width: '200px', fontSize: '1.5rem' }, fieldset: { borderColor: '#fff' }, label: { color: '#fff', fontSize: '1.5rem' } }}
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <TextField
        id="pass"
        label="password"
        variant="outlined"
        sx={{ input: { color: '#fff', width: '200px', fontSize: '1.5rem' }, fieldset: { borderColor: '#fff' }, label: { color: '#fff', fontSize: '1.5rem' }, marginTop: '16px' }}
        defaultValue={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <br />
      <Button
        variant="contained"
        sx={{ width: '200px', fontSize: '1.5rem', marginTop: '16px' }}
        onClick={() => handleFormSubmit()}
      >
        ログイン
      </Button>
    </>
  )
}