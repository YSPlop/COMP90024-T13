

melb <- read.csv('melblarge.csv')

model <- lm(avg ~ (distance_to_melbourne_km 
            + drug_usage_and_possession_offences_per_1000_pop_rank 
            + unemployment_rate_perc
            + households_with_rental_stress_perc
            + ppl_with_income_less_aud400_per_week_perc
            + perc_of_families_headed_by_one_parent_male_perc
            + ppl_who_rated_their_cmty_as_a_pleasant_env_perc
            +ppl_who_feel_safe_on_streets_alone_perc
            + family_violence_incidents_per_1000_pop)^2, data = melb)



model3 <-step(model)
summary(model3)
