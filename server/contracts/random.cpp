#include <random.hpp>

/**
 *  The init() and apply() methods must have C calling convention so that the blockchain can lookup and
 *  call these methods.
 */
extern "C" {

    /**
     *  This method is called once when the contract is published or updated.
     */
    void init()  {
       arisen::print( "Init World!\n" ); // Replace with actual code
    }

    /// The apply method implements the dispatch of actions to this contract
    void apply( uint64_t code, uint64_t action ) {
       arisen::print( "Hello World: ", arisen::name(code), "->", arisen::name(action), "\n" ); 
    }

} // extern "C"
