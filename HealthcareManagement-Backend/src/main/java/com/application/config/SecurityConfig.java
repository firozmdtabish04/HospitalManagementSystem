package com.application.config;

import javax.servlet.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

import com.application.filter.JwtFilter;
import com.application.service.UserRegistrationService;

@SuppressWarnings("unused")
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserRegistrationService registrationService;

    @Autowired
    private JwtFilter jwtFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(registrationService);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    // CORS Configuration Source Bean: Ye Browser ke Preflight (OPTIONS) request ko
    // handle karega
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200")); // Aapka Angular URL
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept", "x-auth-token"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // http.cors() add kiya gaya hai taaki Security hamare CORS rules ko follow kare
        http.cors().and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/authenticate").permitAll()
                .antMatchers("/", "/loginuser", "/logindoctor", "/registeruser", "/registerdoctor", "/addDoctor",
                        "/gettotalusers")
                .permitAll()
                .antMatchers("/doctorlist", "/gettotaldoctors", "/gettotalslots", "/acceptstatus/{email}",
                        "/rejectstatus/{email}", "/acceptpatient/{slot}", "/rejectpatient/{slot}")
                .permitAll()
                // "/deleteSlot" ko yahan allow kar diya gaya hai
                .antMatchers("/deleteSlot", "/addBookingSlots", "/doctorlistbyemail/{email}", "/slotDetails/{email}",
                        "/slotDetails", "/slotDetailsWithUniqueDoctors", "/slotDetailsWithUniqueSpecializations",
                        "/patientlistbydoctoremail/{email}")
                .permitAll()
                .antMatchers("/addPrescription", "/doctorProfileDetails/{email}", "/updatedoctor",
                        "/patientlistbydoctoremailanddate/{email}", "/userlist", "/getprescriptionbyname/{patientname}",
                        "/patientlistbyemail/{email}")
                .permitAll()
                .antMatchers("/patientlist", "/gettotalpatients", "/gettotalappointments", "/gettotalprescriptions",
                        "/profileDetails/{email}", "/updateuser", "/bookNewAppointment")
                .permitAll()
                .anyRequest().fullyAuthenticated()
                .and().exceptionHandling()
                .accessDeniedHandler((request, response, accessDeniedException) -> {
                    AccessDeniedHandler defaultAccessDeniedHandler = new AccessDeniedHandlerImpl();
                    defaultAccessDeniedHandler.handle(request, response, accessDeniedException);
                }).and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore((Filter) jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }
}