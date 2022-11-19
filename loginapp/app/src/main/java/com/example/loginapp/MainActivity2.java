package com.example.loginapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.google.android.material.button.MaterialButton;

public class MainActivity2 extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);

        MaterialButton signoutbtn = (MaterialButton) findViewById(R.id.signoutbutton);
        signoutbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openActi1();
            }
        });
    }
    public void openActi1()
    {
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }
}