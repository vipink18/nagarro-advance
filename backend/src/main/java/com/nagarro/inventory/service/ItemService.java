package com.nagarro.inventory.service;

import com.nagarro.inventory.model.Item;
import com.nagarro.inventory.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    private AtomicInteger cacheCallCount = new AtomicInteger(0);

    private void incrementCacheCount() {
        cacheCallCount.incrementAndGet();
    }

    @Cacheable(value = "items")
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @Cacheable(value = "item", key = "#id")
    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    @CachePut(value = "item", key = "#result.id")
    @CacheEvict(value = "items", allEntries = true)
    public Item createItem(Item item) {
        return itemRepository.save(item);
    }

    @CachePut(value = "item", key = "#item.id")
    @CacheEvict(value = "items", allEntries = true)
    public Item updateItem(Item item) {
        return itemRepository.save(item);
    }

    @CacheEvict(value = {"item", "items"}, allEntries = true)
    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }
}
