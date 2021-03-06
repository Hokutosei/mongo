// Simple covered index query test

var coll = db.getCollection("covered_simple_id")
coll.drop()
for (i=0;i<10;i++) {
    coll.insert({_id:i})
}
coll.insert({_id:"string"})
coll.insert({_id:{bar:1}})
coll.insert({_id:null})

// Test equality with int value
// NEW QUERY EXPLAIN
assert.eq(coll.find({_id:1}, {_id:1}).hint({_id:1}).itcount(), 1);
/* NEW QUERY EXPLAIN
assert.eq(true, plan.indexOnly, "simple.id.1 - indexOnly should be true on covered query")
*/
/* NEW QUERY EXPLAIN
assert.eq(0, plan.nscannedObjects, "simple.id.1 - nscannedObjects should be 0 for covered query")
*/

// Test equality with string value
// NEW QUERY EXPLAIN
assert.eq(coll.find({_id:"string"}, {_id:1}).hint({_id:1}).itcount(), 1);
/* NEW QUERY EXPLAIN
assert.eq(true, plan.indexOnly, "simple.id.2 - indexOnly should be true on covered query")
*/
/* NEW QUERY EXPLAIN
assert.eq(0, plan.nscannedObjects, "simple.id.2 - nscannedObjects should be 0 for covered query")
*/

// Test equality with int value on a dotted field
// NEW QUERY EXPLAIN
assert.eq(coll.find({_id:{bar:1}}, {_id:1}).hint({_id:1}).itcount(), 1);
/* NEW QUERY EXPLAIN
assert.eq(true, plan.indexOnly, "simple.id.3 - indexOnly should be true on covered query")
*/
/* NEW QUERY EXPLAIN
assert.eq(0, plan.nscannedObjects, "simple.id.3 - nscannedObjects should be 0 for covered query")
*/

// Test no query
// NEW QUERY EXPLAIN
assert.eq(coll.find({}, {_id:1}).hint({_id:1}).itcount(), 13);
/* NEW QUERY EXPLAIN
assert.eq(true, plan.indexOnly, "simple.id.4 - indexOnly should be true on covered query")
*/
/* NEW QUERY EXPLAIN
assert.eq(0, plan.nscannedObjects, "simple.id.4 - nscannedObjects should be 0 for covered query")
*/

// Test range query
// NEW QUERY EXPLAIN
assert.eq(coll.find({_id:{$gt:2,$lt:6}}, {_id:1}).hint({_id:1}).itcount(), 3); 
/* NEW QUERY EXPLAIN
assert.eq(true, plan.indexOnly, "simple.id.5 - indexOnly should be true on covered query")
*/
/* NEW QUERY EXPLAIN
assert.eq(0, plan.nscannedObjects, "simple.id.5 - nscannedObjects should be 0 for covered query")
*/

// Test in query
// NEW QUERY EXPLAIN
assert.eq(coll.find({_id:{$in:[5,8]}}, {_id:1}).hint({_id:1}).itcount(), 2); 
/* NEW QUERY EXPLAIN
assert.eq(true, plan.indexOnly, "simple.id.6 - indexOnly should be true on covered query")
*/
/* NEW QUERY EXPLAIN
assert.eq(0, plan.nscannedObjects, "simple.id.6 - nscannedObjects should be 0 for covered query")
*/

// Test not in query
// NEW QUERY EXPLAIN
assert.eq(coll.find({_id:{$nin:[5,8]}}, {_id:1}).hint({_id:1}).itcount(), 11); 
/* NEW QUERY EXPLAIN
assert.eq(true, plan.indexOnly, "simple.id.7 - indexOnly should be true on covered query")
*/
// this should be 0 but is not due to bug https://jira.mongodb.org/browse/SERVER-3187
/* NEW QUERY EXPLAIN
assert.eq(13, plan.nscannedObjects, "simple.id.7 - nscannedObjects should be 0 for covered query")
*/

print ('all tests pass')
