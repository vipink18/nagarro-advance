package com.nagarro.inventory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import com.nagarro.inventory.repository.ItemRepository;
import com.nagarro.inventory.model.Item;
import org.springframework.retry.annotation.EnableRetry;

@EnableCaching
@SpringBootApplication
//@EnableRetry
public class InventoryApplication {

	public static void main(String[] args) {
		SpringApplication.run(InventoryApplication.class, args);
	}

    @Bean
    public CommandLineRunner loadData(ItemRepository itemRepository) {
        return args -> {
            if (itemRepository.count() == 0) { // Only insert if DB is empty
                itemRepository.save(new Item(null, "Apple iPhone 14 Pro", 15, 1299.99));
                itemRepository.save(new Item(null, "Samsung Galaxy S23", 20, 999.99));
                itemRepository.save(new Item(null, "Sony WH-1000XM5 Headphones", 8, 349.99));
                itemRepository.save(new Item(null, "Dell XPS 13 Laptop", 5, 1599.99));
                itemRepository.save(new Item(null, "Logitech MX Master 3 Mouse", 25, 99.99));
                itemRepository.save(new Item(null, "HP LaserJet Pro Printer", 7, 229.99));
                itemRepository.save(new Item(null, "Apple MacBook Air M2", 10, 1199.99));
                itemRepository.save(new Item(null, "Bose SoundLink Bluetooth Speaker", 18, 129.99));
                itemRepository.save(new Item(null, "Canon EOS M50 Camera", 4, 649.99));
                itemRepository.save(new Item(null, "Microsoft Surface Pro 9", 6, 1399.99));
                itemRepository.save(new Item(null, "Seagate 2TB External HDD", 30, 79.99));
                itemRepository.save(new Item(null, "TP-Link WiFi Router", 22, 59.99));
                itemRepository.save(new Item(null, "Amazon Echo Dot (5th Gen)", 40, 49.99));
                itemRepository.save(new Item(null, "Lenovo ThinkPad X1 Carbon", 3, 1799.99));
                itemRepository.save(new Item(null, "Asus ROG Gaming Monitor", 9, 499.99));
            }
        };
    }

}
