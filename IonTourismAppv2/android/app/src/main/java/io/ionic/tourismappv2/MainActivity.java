package io.ionic.tourismappv2;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.hemangkumar.capacitorgooglemaps.CapacitorGoogleMaps;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      registerPlugin(CapacitorGoogleMaps.class);
    }
}
